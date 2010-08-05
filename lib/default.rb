# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

# Extend Item
class Nanoc3::Item
  def content(opts = {})
    opts[:rep] ||= :default
    opts[:snapshot] ||= :last
    reps.find { |r| r.name == opts[:rep] }.content_at_snapshot(opts[:snapshot])
  end

  def name
    identifier.split("/").last
  end
end

# Extend Item
class Nanoc3::Site
  def posts
    items.find_all { |i| i[:kind] == "article" }
  end
end
