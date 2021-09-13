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
    
    # supervisor_params.each do |ss|
    #   binding.pry
    #   @project.site_supervisors.create(ss[1])
    # end
    
    render :show
  end

  def destroy
    @project = Project.find(params[:id])
    if @project.destroy
    # @project.site_supervisors.destroy_all
      render :show
    end
  end

  def update
    project_params = params[:project].permit(:name)
    supervisor_params = params[:project].permit(site_supervisors: [:employee_id, :id])
    
    @project = Project.find(params[:id])

    
    if @project.update(project_params)
      list_of_current_ss = @project.site_supervisors
      list_of_current_ss = list_of_current_ss.map{|ss| ss.employee_id}


      list_of_new_ss = supervisor_params
      list_of_new_ss = list_of_new_ss["site_supervisors"].map{|ss|ss["employee_id"]}

      list_of_ss_to_delete = list_of_current_ss - list_of_new_ss

      list_of_ss_to_delete.each do |ss|
        find_ss_to_delete = @project.site_supervisors.find_by(employee_id:ss)
        if find_ss_to_delete.present?
          find_ss_to_delete.destroy
        end
      end
      
      

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


    end

  end

  private
    def project_params
      params.require(:project).permit(:name)
    end
end
