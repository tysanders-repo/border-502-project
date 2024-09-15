# backend/Dockerfile

# Comes with Ruby installed
FROM ruby:3.3.5

# Install Node.js and PostgreSQL client (needed for Rails asset pipeline and DB connections)
RUN apt-get update && apt-get install -y nodejs postgresql-client netcat-openbsd

# Set working directory
WORKDIR /app

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install Gems
RUN bundle install

# Copy the rest of the application code
COPY . .

# Use entrypoint to handle migrations and start the server
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
