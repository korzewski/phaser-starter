export default function(_self, object) {
  const shake = _self.add.tween(object);

  shake.to({ rotation: -2 * Math.PI / 180 }, 50);
  shake.to({ rotation: 0 * Math.PI / 180 }, 50);
  shake.start();
}