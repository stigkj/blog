class PngCrusher < Nanoc3::Filter

  identifier :pngcrush
  type       :binary

  def run(filename, params={})
    system(
      'optipng',
      '-o' + params[:level].to_s,
      '-out',
      output_filename,
      filename
    )
  end

end
