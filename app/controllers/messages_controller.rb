class MessagesController < ApplicationController

  def index
    @message = Message.new
    @messages = @group.messages.include(:user)
  end

  def create
    if Message.create(message_params)
      redirect_to group_messages_path #あとでグループidがわかるように差し替え
    else
      render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
