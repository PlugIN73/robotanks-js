class window.Bullet
  constructor: (options) ->
    @id = options.id
    @width = 5
    @height = 5
    @x = options.x
    @y = options.y
    @angle = options.angle
    @need_draw = 1

  set_center: (x, y) ->
    @x = x;
    @y = y;