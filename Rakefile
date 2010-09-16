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
