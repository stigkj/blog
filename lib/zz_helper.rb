include Nanoc3::Extra::TimeExtensions
include Nanoc3::Helpers::Blogging
include Nanoc3::Helpers::Breadcrumbs
include Nanoc3::Helpers::Capturing
include Nanoc3::Helpers::Filtering
include Nanoc3::Helpers::HTMLEscape
include Nanoc3::Helpers::LinkTo
include Nanoc3::Helpers::Rendering
include Nanoc3::Helpers::Tagging
include Nanoc3::Helpers::Text
include Nanoc3::Helpers::XMLSitemap

include RandomTextHelper

# ------------------- PATCH -------------------------
# Monkey-patch Date to contain an gmtime function
# Should be structurally fixed by
# http://projects.stoneship.org/trac/nanoc/ticket/122
# ---------------------------------------------------
class Date
	def to_time
		Time.parse(self.strftime('%Y/%m/%d'))
	end

	def gmtime
		self.to_time.gmtime
	end
end
