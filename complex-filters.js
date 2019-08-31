/* check this out :
https://www.html5rocks.com/en/tutorials/canvas/imagefilters/
*/

function detectEdges(oldColor){
    let avg = (oldColor.r + oldColor.g + oldColor.b)/3;
    let avg_left = (oldColor.r_left + oldColor.g_left + oldColor.b_left)/3;
    let avg_bot = (oldColor.r_bot + oldColor.g_bot + oldColor.b_bot)/3;

    let new_pixel = {
      r: oldColor.r,
      g: oldColor.g,
      b: oldColor.b
    };
    if(Math.abs(avg - avg_left) <= trckVal || Math.abs(avg - avg_bot) <= trckVal){
      new_pixel = {
        r: 255,
        g: 255,
        b: 255
      };
    }
    // return {
    //   r: avg > 100 ? oldColor.r + (avg - oldColor.r) * (trckVal / 100) : 255,
    //   g: avg > 100 ? oldColor.g + (avg - oldColor.g) * (trckVal / 100) : 255,
    //   b: avg > 100 ? oldColor.b + (avg - oldColor.b) * (trckVal / 100) : 255
    // }
    return new_pixel;
}
