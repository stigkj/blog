# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

# Extend Item
class Nanoc3::Item
  def name
    identifier.split("/").last
  end

  def slug
	parts = self.name.split('-', 4)
	parts[3].downcase
  end
end

# Extend Item
class Nanoc3::Site
  def posts
    items.find_all { |i| i[:kind] == "article" }
  end
end

def all_articles
	if $include_drafts then
		sorted_articles
	else
		sorted_articles.select { |a| a[:status] == 'published' }
	end
end
