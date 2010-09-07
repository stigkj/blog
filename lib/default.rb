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

  def html_summary
	img_html = ""
	if self[:image] then
	  img_html = "<img class=\"postimg\" src=\"/img/postimgs/#{self[:image]}\" alt=\"#{self[:title]}\" />"
	  img_html = link_to(img_html, self)
	end

	title_link = link_to(self[:title], self)
	post_status = ""
	post_status = " (#{self[:status]})" unless self[:status] == "published"
	post_date = self[:created_at].strftime('%B %d, %Y')
	html = "<div class=\"post-summary\">#{img_html}" +
		   "<h2 style=\"clear: none\">#{title_link}#{post_status}</h2>" +
	       "<p class=\"postdate\"><span class=\"reldate\">#{post_date}</span></p>" +
	       "#{self[:excerpt]}" +
	       "</div>"
	html
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
