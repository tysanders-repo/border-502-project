module Authentication
    extend ActiveSupport::Concern
    included do
        before_action :authenticate_request
    end
    private
    def authenticate_request
        token = request.headers['Authentication']
        puts token
        if token.present?
            begin
                decrypted_payload, headers = JOSE::JWE.block_decrypt(JWK_OCT512, token)
                decoded_token = JSON.parse(decrypted_payload)

                email = decoded_token['email']

                unless email.present?
                    puts "No email"
                    render json: { error: 'Invalid token payload' }, status: :unauthorized
                    return
                end
                @current_member = Member.find_by email: email
                # puts @current_member.email
                unless @current_member
                    puts "Not a user"
                    render json: { error: 'Unable to authenticate user' }, status: :unauthorized
                end

                rescue ActiveRecord::RecordInvalid => e
                    puts "Invalid data"
                    render json: { error: 'Invalid user data', message: e.message }, status: :unprocessable_entity
                rescue StandardError => e
                    puts e.message
                    render json: { error: 'Authentication failed', message: e.message }, status: :unauthorized
            end
        else
            render json: { error: 'Token missing' }, status: :unauthorized
        end
    end
end
