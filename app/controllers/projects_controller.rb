class ProjectsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @projects = Project.all
  end

  def create
    project_params = params[:project].permit(:name)
    Project.create(project_params)
    head :ok
  end

  def destroy
    @project = Project.find(params[:id])
    if @project.destroy
      render :show
    end
  end

  
end
