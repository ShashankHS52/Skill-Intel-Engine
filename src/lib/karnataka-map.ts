// Karnataka SVG Map with district boundaries
// Based on the official Karnataka district map

export const KarnatakaSVGMap = `
<svg width="600" height="500" viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .district { stroke: #333; stroke-width: 1; cursor: pointer; transition: all 0.3s ease; }
      .district:hover { stroke-width: 2; filter: brightness(1.1); }
      .selected { stroke: #008080; stroke-width: 3; }
      .label { font-family: Arial, sans-serif; font-size: 10px; text-anchor: middle; pointer-events: none; fill: #333; }
    </style>
  </defs>
  
  <!-- District boundaries -->
  <!-- Northern Districts -->
  <path id="bidar" d="M 450 50 L 550 40 L 580 80 L 520 120 L 480 100 Z" class="district" />
  <path id="kalaburagi" d="M 480 100 L 520 120 L 540 160 L 490 180 L 450 140 Z" class="district" />
  <path id="yadgir" d="M 490 180 L 540 160 L 560 200 L 520 220 L 480 200 Z" class="district" />
  <path id="ballary" d="M 450 140 L 490 180 L 480 220 L 430 200 L 410 160 Z" class="district" />
  <path id="koppal" d="M 410 160 L 430 200 L 400 240 L 370 220 L 350 180 Z" class="district" />
  <path id="raichur" d="M 480 200 L 520 220 L 510 260 L 470 280 L 450 240 Z" class="district" />
  
  <!-- Northwestern Districts -->
  <path id="vijayapura" d="M 350 180 L 370 220 L 340 260 L 300 240 L 280 200 Z" class="district" />
  <path id="bagalkot" d="M 280 200 L 300 240 L 270 280 L 230 260 L 210 220 Z" class="district" />
  <path id="belagavi" d="M 50 150 L 150 130 L 180 170 L 130 190 L 80 180 Z" class="district" />
  <path id="dharwad" d="M 180 170 L 230 160 L 250 200 L 210 220 L 180 210 Z" class="district" />
  <path id="gadag" d="M 210 220 L 250 200 L 270 240 L 240 260 L 210 250 Z" class="district" />
  <path id="haveri" d="M 180 210 L 210 220 L 210 250 L 180 260 L 160 230 Z" class="district" />
  
  <!-- Central Districts -->
  <path id="uttara-kannada" d="M 80 180 L 130 190 L 140 230 L 90 250 L 50 240 Z" class="district" />
  <path id="shivamogga" d="M 160 230 L 210 250 L 200 290 L 160 300 L 140 270 Z" class="district" />
  <path id="davangere" d="M 240 260 L 280 280 L 270 320 L 230 330 L 200 310 Z" class="district" />
  <path id="chitradurga" d="M 270 320 L 310 340 L 300 380 L 260 390 L 240 360 Z" class="district" />
  <path id="hassan" d="M 160 300 L 200 310 L 190 350 L 150 360 L 130 330 Z" class="district" />
  <path id="chikkamagaluru" d="M 140 270 L 160 300 L 130 330 L 100 320 L 90 290 Z" class="district" />
  
  <!-- Eastern Districts -->
  <path id="chikkaballapur" d="M 370 340 L 420 330 L 430 370 L 380 380 L 360 360 Z" class="district" />
  <path id="kolar" d="M 380 380 L 430 370 L 440 410 L 390 420 L 370 400 Z" class="district" />
  <path id="bengaluru-rural" d="M 340 360 L 380 380 L 370 420 L 330 430 L 310 400 Z" class="district" />
  <path id="bengaluru-urban" d="M 330 380 L 370 390 L 360 420 L 320 430 L 300 410 Z" class="district" />
  <path id="ramanagara" d="M 300 410 L 340 420 L 330 460 L 290 470 L 270 440 Z" class="district" />
  <path id="tumakuru" d="M 260 390 L 300 410 L 290 450 L 250 460 L 230 430 Z" class="district" />
  
  <!-- Southern Districts -->
  <path id="mandya" d="M 230 430 L 270 440 L 260 480 L 220 490 L 200 460 Z" class="district" />
  <path id="mysuru" d="M 190 350 L 230 360 L 220 400 L 180 410 L 160 380 Z" class="district" />
  <path id="chamarajanagar" d="M 220 400 L 260 410 L 250 450 L 210 460 L 190 430 Z" class="district" />
  <path id="kodagu" d="M 150 360 L 190 380 L 180 420 L 140 430 L 120 400 Z" class="district" />
  
  <!-- Coastal Districts -->
  <path id="udupi" d="M 50 240 L 90 250 L 80 290 L 40 300 L 20 270 Z" class="district" />
  <path id="dakshina-kannada" d="M 40 300 L 80 290 L 90 320 L 50 340 L 20 330 Z" class="district" />
  
  <!-- District Labels -->
  <text x="500" y="65" class="label">Bidar</text>
  <text x="465" y="130" class="label">Kalaburagi</text>
  <text x="510" y="190" class="label">Yadgir</text>
  <text x="430" y="170" class="label">Ballary</text>
  <text x="380" y="200" class="label">Koppal</text>
  <text x="480" y="240" class="label">Raichur</text>
  <text x="320" y="210" class="label">Vijayapura</text>
  <text x="250" y="240" class="label">Bagalkot</text>
  <text x="115" y="160" class="label">Belagavi</text>
  <text x="215" y="185" class="label">Dharwad</text>
  <text x="240" y="230" class="label">Gadag</text>
  <text x="190" y="230" class="label">Haveri</text>
  <text x="115" y="215" class="label">Uttara Kannada</text>
  <text x="180" y="275" class="label">Shivamogga</text>
  <text x="235" y="295" class="label">Davangere</text>
  <text x="275" y="355" class="label">Chitradurga</text>
  <text x="170" y="335" class="label">Hassan</text>
  <text x="115" y="295" class="label">Chikkamagaluru</text>
  <text x="395" y="355" class="label">Chikkaballapur</text>
  <text x="405" y="395" class="label">Kolar</text>
  <text x="340" y="395" class="label">Bengaluru Rural</text>
  <text x="335" y="405" class="label">Bengaluru Urban</text>
  <text x="315" y="445" class="label">Ramanagara</text>
  <text x="275" y="425" class="label">Tumakuru</text>
  <text x="245" y="465" class="label">Mandya</text>
  <text x="205" y="380" class="label">Mysuru</text>
  <text x="235" y="430" class="label">Chamarajanagar</text>
  <text x="165" y="395" class="label">Kodagu</text>
  <text x="65" y="265" class="label">Udupi</text>
  <text x="65" y="315" class="label">Dakshina Kannada</text>
</svg>`;

// District coordinates for better positioning
export const districtCoordinates: Record<string, { x: number; y: number }> = {
  'bidar': { x: 500, y: 75 },
  'kalaburagi': { x: 465, y: 140 },
  'yadgir': { x: 510, y: 190 },
  'ballary': { x: 430, y: 170 },
  'koppal': { x: 380, y: 200 },
  'raichur': { x: 480, y: 240 },
  'vijayapura': { x: 320, y: 210 },
  'bagalkot': { x: 250, y: 240 },
  'belagavi': { x: 115, y: 160 },
  'dharwad': { x: 215, y: 185 },
  'gadag': { x: 240, y: 230 },
  'haveri': { x: 190, y: 230 },
  'uttara-kannada': { x: 115, y: 215 },
  'shivamogga': { x: 180, y: 275 },
  'davangere': { x: 235, y: 295 },
  'chitradurga': { x: 275, y: 355 },
  'hassan': { x: 170, y: 335 },
  'chikkamagaluru': { x: 115, y: 295 },
  'chikkaballapur': { x: 395, y: 355 },
  'kolar': { x: 405, y: 395 },
  'bengaluru-rural': { x: 340, y: 395 },
  'bengaluru-urban': { x: 335, y: 405 },
  'ramanagara': { x: 315, y: 445 },
  'tumakuru': { x: 275, y: 425 },
  'mandya': { x: 245, y: 465 },
  'mysuru': { x: 205, y: 380 },
  'chamarajanagar': { x: 235, y: 430 },
  'kodagu': { x: 165, y: 395 },
  'udupi': { x: 65, y: 265 },
  'dakshina-kannada': { x: 65, y: 315 }
};