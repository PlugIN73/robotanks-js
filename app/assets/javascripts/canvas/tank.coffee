class window.Tank
  constructor: (options) ->
    @id = options.id
    @width = options.width
    @height = options.height
    @x = options.x
    @y = options.y
    @angle = options.angle
    @need_draw = 1
    @name = options.name

  set_center: (x, y) ->
    @x = x;
    @y = y;