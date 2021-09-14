class ProjectsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @projects = Project.all
  end

  def create
    project_params = params[:project].permit(:name)
    supervisor_params = params[:project].permit(site_supervisors: [:employee_id])
    
    @project = Project.create(project_params)

    if supervisor_params.present?
      supervisor_params["site_supervisors"].each do |ss|
        @project.site_supervisors.create(ss)
      end
    end
    
    render :show
  end

  def destroy
    @project = Project.find(params[:id])
    if @project.destroy
      render :show
    end
  end

  def update    
    project_params = params[:project].permit(:name)
    supervisor_params = params[:project].permit(site_supervisors: [:employee_id, :id])
    
    @project = Project.find(params[:id])
    
    current_ss = @project.site_supervisors.map{|ss| ss.employee_id}
    updated_ss = supervisor_params["site_supervisors"].map{|ss|ss["employee_id"]}
    
    if @project.update(project_params)
      ss_to_delete = current_ss - updated_ss
      ss_to_delete.each do |ss|
        if ss.present?
          @project.site_supervisors.find_by(employee_id:ss).destroy
        end
      end
      
      # why do i have to call this twice? if i don't the remove won't show until page is refreshed
      @project = Project.find(params[:id])

      if supervisor_params.present?
        supervisor_params["site_supervisors"].each do |ss|
          if ss["id"].present?
            find_ss = @project.site_supervisors.find(ss["id"])
            find_ss.update(ss.except("id"))
          else
            @project.site_supervisors.create(ss)
          end
        end
      end

      render :show
    
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  private
    def project_params
      params.require(:project).permit(:name)
    end
end
