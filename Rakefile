require 'nanoc3/tasks'

task :default => [:compile]

task :fullclean => :clean do
	system('git', 'clean', '-qdf')
	system('rm', '-r', 'output', 'tmp')
end

task :rebuild => :fullclean do
	system('rake')
end

task :deploy => 'deploy:rsync'

task :compile do
	system('nanoc', 'compile')
end

task :ping do
	system('scripts/ping.sh')
end

task :publish do
	hudson_url = 'http://94.213.31.147:8657/'
	system('curl', '-s', hudson_url + 'job/nvie.com/build?token=hgfdishg78hegw8hieuh82h0gq')
	puts "Watch the build on " + hudson_url
end
