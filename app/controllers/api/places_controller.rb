class Api::PlacesController < ApplicationController
  def index
    @places = Place.all
    render 'index.json.jbuilder'
  end

  def create
    @place = Place.new(
      name: params[:name],
      address: params[:address]
    )
    if @place.save
      # happy path
      render 'show.json.jbuilder'
    else
      # sad path
      render json: {errors: @place.errors.full_messages}, status: :bad_request
    end
  end
end
