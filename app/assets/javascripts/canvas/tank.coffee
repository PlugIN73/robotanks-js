class window.Tank
  constructor: (options) ->
    @id = options.id
    @width = options.width
    @height = options.height
    @pos_x = options.x
    @pos_y = options.y

  set_pos: (x, y) ->
    @pos_x = x
    @pos_y = y