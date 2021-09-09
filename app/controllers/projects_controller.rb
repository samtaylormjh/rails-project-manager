class ProjectsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @projects = Project.all
  end

  def create
    project_params = params[:project].permit(:name)
    supervisor_params = params[:project].permit(site_supervisors: [:employee_id])
    
    @project = Project.create(project_params)

    supervisor_params["site_supervisors"].each do |ss|
      @project.site_supervisors.create(ss)
    end
    
    # supervisor_params.each do |ss|
    #   binding.pry
    #   @project.site_supervisors.create(ss[1])
    # end
    
    head :ok
  end

  def destroy
    @project = Project.find(params[:id])
    if @project.destroy
      render :show
    end
  end

  def update
    @project = Project.find(params[:id])
    if @project.update(project_params)
      render :show, status: :ok, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  private
    def project_params
      params.require(:project).permit(:name)
    end
end
