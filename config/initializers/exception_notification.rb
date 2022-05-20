if Rails.env == 'production'
  Rails.application.config.middleware.use ExceptionNotification::Rack,
                                          ignore_exceptions: ExceptionNotifier.ignored_exceptions,
                                          email: {
                                            email_prefix: 'PROD ERROR',
                                            sender_address: "rubyitechart@gmail.com",
                                            exception_recipients: %w{exceptions@example.com}
                                          }
end
