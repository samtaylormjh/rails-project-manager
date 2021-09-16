class ProjectsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @projects = Project.all
  end

  def create
    @project = Project.new(project_params)
    if @project.save
      render :show
    end
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
      render :show
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  private
    def project_params
      params.require(:project).permit(:name,:notes,site_supervisors_attributes: [:id,:employee_id,:_destroy,:days_working_attributes => [:id]])
    end
end
