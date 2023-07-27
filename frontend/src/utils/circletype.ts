// @ts-nocheck
import CircleType from 'circletype';

export function applyCurvedText() {
  const curvedTextElement = document.getElementById('curved-text');
  const circleType = new CircleType(curvedTextElement);
  circleType.radius(150); // Set the radius of the circle or ellipse
}
