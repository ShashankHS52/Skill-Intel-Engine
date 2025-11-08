import React from 'react';

interface KarnatakaSVGProps {
  onDistrictHover: (districtId: string | null) => void;
  onDistrictClick: (districtId: string) => void;
  hoveredDistrict: string | null;
  selectedDistrict: string | null;
  getDistrictColor: (districtId: string) => string;
}

export const KarnatakaSVGComponent: React.FC<KarnatakaSVGProps> = ({
  onDistrictHover,
  onDistrictClick,
  hoveredDistrict,
  selectedDistrict,
  getDistrictColor,
}) => {
  const getDistrictStyle = (districtId: string) => ({
    fill: getDistrictColor(districtId),
    stroke: selectedDistrict === districtId ? '#008080' : '#333',
    strokeWidth: selectedDistrict === districtId ? 3 : hoveredDistrict === districtId ? 2 : 1,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    filter: hoveredDistrict === districtId ? 'brightness(1.2) drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' : 'none',
    transform: hoveredDistrict === districtId ? 'scale(1.02)' : 'scale(1)',
    transformOrigin: 'center',
  });

  const handleDistrictMouseEnter = (districtId: string) => {
    onDistrictHover(districtId);
  };

  const handleDistrictMouseLeave = () => {
    onDistrictHover(null);
  };

  const handleDistrictClick = (districtId: string) => {
    onDistrictClick(districtId);
  };

  return (
    <svg width="600" height="500" viewBox="0 0 600 500" className="w-full h-auto max-w-4xl max-h-[400px]">
      <defs>
        <filter id="district-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
        </filter>
      </defs>
      
      {/* Northern Districts */}
      <path
        id="bidar"
        d="M 450 50 L 550 40 L 580 80 L 520 120 L 480 100 Z"
        style={getDistrictStyle('bidar')}
        onMouseEnter={() => handleDistrictMouseEnter('bidar')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('bidar')}
      />
      <path
        id="kalaburagi"
        d="M 480 100 L 520 120 L 540 160 L 490 180 L 450 140 Z"
        style={getDistrictStyle('kalaburagi')}
        onMouseEnter={() => handleDistrictMouseEnter('kalaburagi')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('kalaburagi')}
      />
      <path
        id="yadgir"
        d="M 490 180 L 540 160 L 560 200 L 520 220 L 480 200 Z"
        style={getDistrictStyle('yadgir')}
        onMouseEnter={() => handleDistrictMouseEnter('yadgir')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('yadgir')}
      />
      <path
        id="ballary"
        d="M 450 140 L 490 180 L 480 220 L 430 200 L 410 160 Z"
        style={getDistrictStyle('ballary')}
        onMouseEnter={() => handleDistrictMouseEnter('ballary')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('ballary')}
      />
      <path
        id="koppal"
        d="M 410 160 L 430 200 L 400 240 L 370 220 L 350 180 Z"
        style={getDistrictStyle('koppal')}
        onMouseEnter={() => handleDistrictMouseEnter('koppal')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('koppal')}
      />
      <path
        id="raichur"
        d="M 480 200 L 520 220 L 510 260 L 470 280 L 450 240 Z"
        style={getDistrictStyle('raichur')}
        onMouseEnter={() => handleDistrictMouseEnter('raichur')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('raichur')}
      />
      
      {/* Northwestern Districts */}
      <path
        id="vijayapura"
        d="M 350 180 L 370 220 L 340 260 L 300 240 L 280 200 Z"
        style={getDistrictStyle('vijayapura')}
        onMouseEnter={() => handleDistrictMouseEnter('vijayapura')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('vijayapura')}
      />
      <path
        id="bagalkot"
        d="M 280 200 L 300 240 L 270 280 L 230 260 L 210 220 Z"
        style={getDistrictStyle('bagalkot')}
        onMouseEnter={() => handleDistrictMouseEnter('bagalkot')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('bagalkot')}
      />
      <path
        id="belagavi"
        d="M 50 150 L 150 130 L 180 170 L 130 190 L 80 180 Z"
        style={getDistrictStyle('belagavi')}
        onMouseEnter={() => handleDistrictMouseEnter('belagavi')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('belagavi')}
      />
      <path
        id="dharwad"
        d="M 180 170 L 230 160 L 250 200 L 210 220 L 180 210 Z"
        style={getDistrictStyle('dharwad')}
        onMouseEnter={() => handleDistrictMouseEnter('dharwad')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('dharwad')}
      />
      <path
        id="gadag"
        d="M 210 220 L 250 200 L 270 240 L 240 260 L 210 250 Z"
        style={getDistrictStyle('gadag')}
        onMouseEnter={() => handleDistrictMouseEnter('gadag')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('gadag')}
      />
      <path
        id="haveri"
        d="M 180 210 L 210 220 L 210 250 L 180 260 L 160 230 Z"
        style={getDistrictStyle('haveri')}
        onMouseEnter={() => handleDistrictMouseEnter('haveri')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('haveri')}
      />
      
      {/* Central Districts */}
      <path
        id="uttara-kannada"
        d="M 80 180 L 130 190 L 140 230 L 90 250 L 50 240 Z"
        style={getDistrictStyle('uttara-kannada')}
        onMouseEnter={() => handleDistrictMouseEnter('uttara-kannada')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('uttara-kannada')}
      />
      <path
        id="shivamogga"
        d="M 160 230 L 210 250 L 200 290 L 160 300 L 140 270 Z"
        style={getDistrictStyle('shivamogga')}
        onMouseEnter={() => handleDistrictMouseEnter('shivamogga')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('shivamogga')}
      />
      <path
        id="davangere"
        d="M 240 260 L 280 280 L 270 320 L 230 330 L 200 310 Z"
        style={getDistrictStyle('davangere')}
        onMouseEnter={() => handleDistrictMouseEnter('davangere')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('davangere')}
      />
      <path
        id="chitradurga"
        d="M 270 320 L 310 340 L 300 380 L 260 390 L 240 360 Z"
        style={getDistrictStyle('chitradurga')}
        onMouseEnter={() => handleDistrictMouseEnter('chitradurga')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('chitradurga')}
      />
      <path
        id="hassan"
        d="M 160 300 L 200 310 L 190 350 L 150 360 L 130 330 Z"
        style={getDistrictStyle('hassan')}
        onMouseEnter={() => handleDistrictMouseEnter('hassan')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('hassan')}
      />
      <path
        id="chikkamagaluru"
        d="M 140 270 L 160 300 L 130 330 L 100 320 L 90 290 Z"
        style={getDistrictStyle('chikkamagaluru')}
        onMouseEnter={() => handleDistrictMouseEnter('chikkamagaluru')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('chikkamagaluru')}
      />
      
      {/* Eastern Districts */}
      <path
        id="chikkaballapur"
        d="M 370 340 L 420 330 L 430 370 L 380 380 L 360 360 Z"
        style={getDistrictStyle('chikkaballapur')}
        onMouseEnter={() => handleDistrictMouseEnter('chikkaballapur')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('chikkaballapur')}
      />
      <path
        id="kolar"
        d="M 380 380 L 430 370 L 440 410 L 390 420 L 370 400 Z"
        style={getDistrictStyle('kolar')}
        onMouseEnter={() => handleDistrictMouseEnter('kolar')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('kolar')}
      />
      <path
        id="bengaluru-rural"
        d="M 340 360 L 380 380 L 370 420 L 330 430 L 310 400 Z"
        style={getDistrictStyle('bengaluru-rural')}
        onMouseEnter={() => handleDistrictMouseEnter('bengaluru-rural')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('bengaluru-rural')}
      />
      <path
        id="bengaluru-urban"
        d="M 330 380 L 370 390 L 360 420 L 320 430 L 300 410 Z"
        style={getDistrictStyle('bengaluru-urban')}
        onMouseEnter={() => handleDistrictMouseEnter('bengaluru-urban')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('bengaluru-urban')}
      />
      <path
        id="ramanagara"
        d="M 300 410 L 340 420 L 330 460 L 290 470 L 270 440 Z"
        style={getDistrictStyle('ramanagara')}
        onMouseEnter={() => handleDistrictMouseEnter('ramanagara')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('ramanagara')}
      />
      <path
        id="tumakuru"
        d="M 260 390 L 300 410 L 290 450 L 250 460 L 230 430 Z"
        style={getDistrictStyle('tumakuru')}
        onMouseEnter={() => handleDistrictMouseEnter('tumakuru')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('tumakuru')}
      />
      
      {/* Southern Districts */}
      <path
        id="mandya"
        d="M 230 430 L 270 440 L 260 480 L 220 490 L 200 460 Z"
        style={getDistrictStyle('mandya')}
        onMouseEnter={() => handleDistrictMouseEnter('mandya')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('mandya')}
      />
      <path
        id="mysuru"
        d="M 190 350 L 230 360 L 220 400 L 180 410 L 160 380 Z"
        style={getDistrictStyle('mysuru')}
        onMouseEnter={() => handleDistrictMouseEnter('mysuru')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('mysuru')}
      />
      <path
        id="chamarajanagar"
        d="M 220 400 L 260 410 L 250 450 L 210 460 L 190 430 Z"
        style={getDistrictStyle('chamarajanagar')}
        onMouseEnter={() => handleDistrictMouseEnter('chamarajanagar')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('chamarajanagar')}
      />
      <path
        id="kodagu"
        d="M 150 360 L 190 380 L 180 420 L 140 430 L 120 400 Z"
        style={getDistrictStyle('kodagu')}
        onMouseEnter={() => handleDistrictMouseEnter('kodagu')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('kodagu')}
      />
      
      {/* Coastal Districts */}
      <path
        id="udupi"
        d="M 50 240 L 90 250 L 80 290 L 40 300 L 20 270 Z"
        style={getDistrictStyle('udupi')}
        onMouseEnter={() => handleDistrictMouseEnter('udupi')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('udupi')}
      />
      <path
        id="dakshina-kannada"
        d="M 40 300 L 80 290 L 90 320 L 50 340 L 20 330 Z"
        style={getDistrictStyle('dakshina-kannada')}
        onMouseEnter={() => handleDistrictMouseEnter('dakshina-kannada')}
        onMouseLeave={handleDistrictMouseLeave}
        onClick={() => handleDistrictClick('dakshina-kannada')}
      />
      
      {/* District Labels */}
      <text x="500" y="65" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Bidar</text>
      <text x="465" y="130" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Kalaburagi</text>
      <text x="510" y="190" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Yadgir</text>
      <text x="430" y="170" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Ballary</text>
      <text x="380" y="200" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Koppal</text>
      <text x="480" y="240" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Raichur</text>
      <text x="320" y="210" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Vijayapura</text>
      <text x="250" y="240" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Bagalkot</text>
      <text x="115" y="160" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Belagavi</text>
      <text x="215" y="185" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Dharwad</text>
      <text x="240" y="230" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Gadag</text>
      <text x="190" y="230" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Haveri</text>
      <text x="115" y="215" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">U. Kannada</text>
      <text x="180" y="275" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Shivamogga</text>
      <text x="235" y="295" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Davangere</text>
      <text x="275" y="355" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Chitradurga</text>
      <text x="170" y="335" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Hassan</text>
      <text x="115" y="295" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Chikkamagaluru</text>
      <text x="395" y="355" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Chikkaballapur</text>
      <text x="405" y="395" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Kolar</text>
      <text x="340" y="395" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Bengaluru R</text>
      <text x="335" y="405" className="text-xs fill-gray-700 font-bold pointer-events-none text-center" textAnchor="middle">Bengaluru</text>
      <text x="315" y="445" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Ramanagara</text>
      <text x="275" y="425" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Tumakuru</text>
      <text x="245" y="465" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Mandya</text>
      <text x="205" y="380" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Mysuru</text>
      <text x="235" y="430" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Chamarajanagar</text>
      <text x="165" y="395" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Kodagu</text>
      <text x="65" y="265" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">Udupi</text>
      <text x="65" y="315" className="text-xs fill-gray-700 font-medium pointer-events-none text-center" textAnchor="middle">D. Kannada</text>
    </svg>
  );
};