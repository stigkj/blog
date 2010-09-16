# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

# Extend Item
class Nanoc3::Item
  def name
    identifier.split("/").last
  end

  def slug
	self.name.downcase
  end

  def html_dateline
    html = ""
    if self[:created_at] then
      html += "<p class=\"created_at dateline\">Published: <span class=\"reldate\">#{self[:created_at].strftime('%B %d, %Y')}</span></p>"
    end
    if self[:updated_at] and self[:updated_at] != self[:created_at] then
      html += "<p class=\"updated_at dateline\">Last updated: <span class=\"reldate\">#{self[:updated_at].strftime('%B %d, %Y')}</span> <a id=\"toggle-edits\" href=\"#\">(highlight updates)</a></p>"
    end
    html
  end

  def html_summary
	img_html = ""
	if self[:image] then
	  img_html = "<img class=\"postimg\" src=\"/img/postimgs/#{self[:image]}\" alt=\"#{self[:title]}\" />"
	  img_html = link_to(img_html, self)
	end

	title_link = link_to(self[:title], self)
	post_status = ""
	post_status = " (draft)" unless self[:published]
	post_date = self[:created_at].strftime('%B %d, %Y')
	html = "<div class=\"post-summary\">" +
		   "<h2 style=\"clear: none\">#{title_link}#{post_status}</h2>" +
		   "#{img_html}" +
		   self.html_dateline +
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
		sorted_articles.select { |a| a[:published] }
	end
end
