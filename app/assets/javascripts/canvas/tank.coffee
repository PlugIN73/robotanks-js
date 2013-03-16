class window.Tank
  constructor: (options) ->
    @id = options.id
    @width = options.width
    @height = options.height
    @x = options.x
    @y = options.y

  set_center: (x, y) ->
    @x = x
    @y = y