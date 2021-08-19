require "test_helper"

class ExamplesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @example = examples(:one)
  end

  test "should get index" do
    get examples_url, as: :json
    assert_response :success
  end

  test "should create example" do
    assert_difference('Example.count') do
      post examples_url, params: { example: { name: @example.name, number: @example.number } }, as: :json
    end

    assert_response 201
  end

  test "should show example" do
    get example_url(@example), as: :json
    assert_response :success
  end

  test "should update example" do
    patch example_url(@example), params: { example: { name: @example.name, number: @example.number } }, as: :json
    assert_response 200
  end

  test "should destroy example" do
    assert_difference('Example.count', -1) do
      delete example_url(@example), as: :json
    end

    assert_response 204
  end
end
