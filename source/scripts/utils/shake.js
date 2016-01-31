export default function(_self, object, direction = -1) {
  const shake = _self.add.tween(object);

  shake.to({ rotation: direction * 20 * Math.PI / 180 }, 50);
  shake.to({ rotation: 0 * Math.PI / 180 }, 50);
  shake.start();
}