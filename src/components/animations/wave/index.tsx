import { motion } from 'framer-motion';

export const WaveEffect = () => {
  const svgVariants = {
    hidden: { 
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 2,
        ease: "linear",
      }
    }
  }

  const pathVariants = {
    hidden: {
      pathLength: 0,
      pathOffset: 0,
      pathSpacing: 0.5,
      scale: 1,
    },
    visible: {
      pathLength: 1,
      pathOffset: 0.2,
      pathSpacing: 0.5,
      scale: 1.2,
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: 4,
        repeatType: 'reverse',
      },
    }
  }


  return (
    <div style={{
      width: '100%',
    }}>
      <motion.svg variants={svgVariants} initial='hidden' animate='visible' xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 50 }} version="1.1" preserveAspectRatio="none" viewBox="0 0 1500 560">
        <motion.g fill="none">
          <motion.path strokeDasharray="0 1" variants={pathVariants} initial="hidden" animate="visible"  d="M -537.7769702681783,269 C -462.78,284.8 -312.78,370.2 -162.77697026817833,348 C -12.78,325.8 62.22,137.2 212.22302973182167,158 C 362.22,178.8 437.22,440.4 587.2230297318217,452 C 737.22,463.6 812.22,213.4 962.2230297318217,216 C 1112.22,218.6 1229.67,458 1337.2230297318217,465 C 1444.78,472 1467.44,293.8 1500,251" stroke="rgba(255, 44, 85, 1)" strokeWidth="2"/>
          <motion.path strokeDasharray="0 1" variants={pathVariants} initial="hidden" animate="visible"  d="M -431.89999910979463,248 C -356.9,267.4 -206.9,368.6 -56.89999910979465,345 C 93.1,321.4 168.1,108.4 318.10000089020537,130 C 468.1,151.6 543.1,451.2 693.1000008902054,453 C 843.1,454.8 918.1,166.2 1068.1000008902054,139 C 1218.1,111.8 1356.72,311.2 1443.1000008902054,317 C 1529.48,322.8 1488.62,197.8 1500,168" stroke="rgba(255, 44, 85, 1)" strokeWidth="2"/>
          <motion.path strokeDasharray="0 1" variants={pathVariants} initial="hidden" animate="visible"  d="M -603.2689980619353,390 C -528.27,357.2 -378.27,232.6 -228.26899806193538,226 C -78.27,219.4 -3.27,368.4 146.73100193806462,357 C 296.73,345.6 371.73,175.2 521.7310019380647,169 C 671.73,162.8 746.73,310.2 896.7310019380647,326 C 1046.73,341.8 1151.08,229 1271.7310019380645,248 C 1392.38,267 1454.35,386.4 1500,421" stroke="rgba(255, 44, 85, 1)" strokeWidth="2"/>
          <motion.path strokeDasharray="0 1" variants={pathVariants} initial="hidden" animate="visible"  d="M -425.7402232484126,402 C -350.74,377.4 -200.74,264.2 -50.7402232484126,279 C 99.26,293.8 174.26,481.8 324.2597767515874,476 C 474.26,470.2 549.26,259 699.2597767515874,250 C 849.26,241 924.26,441 1074.2597767515874,431 C 1224.26,421 1364.11,224.6 1449.2597767515874,200 C 1534.41,175.4 1489.85,286.4 1500,308" stroke="rgba(255, 44, 85, 1)" strokeWidth="2"/>
          <motion.path strokeDasharray="0 1" variants={pathVariants} initial="hidden" animate="visible"  d="M -514.7378349740834,321 C -439.74,296 -289.74,194 -139.7378349740834,196 C 10.26,198 85.26,319.4 235.2621650259166,331 C 385.26,342.6 460.26,260.4 610.2621650259166,254 C 760.26,247.6 835.26,309.4 985.2621650259166,299 C 1135.26,288.6 1257.31,185.4 1360.2621650259166,202 C 1463.21,218.6 1472.05,346 1500,382" stroke="rgba(255, 44, 85, 1)" strokeWidth="2"/>
          <motion.path strokeDasharray="0 1" variants={pathVariants} initial="hidden" animate="visible"  d="M -575.9001066585028,170 C -500.9,230.8 -350.9,455.6 -200.90010665850272,474 C -50.9,492.4 24.1,287.6 174.09989334149728,262 C 324.1,236.4 399.1,357.4 549.0998933414972,346 C 699.1,334.6 774.1,199.8 924.0998933414972,205 C 1074.1,210.2 1183.92,393.8 1299.0998933414974,372 C 1414.28,350.2 1459.82,151.2 1500,96" stroke="rgba(255, 44, 85, 1)" strokeWidth="2"/>
          <motion.path strokeDasharray="0 1" variants={pathVariants} initial="hidden" animate="visible"  d="M -559.4815057993427,175 C -484.48,226 -334.48,417.4 -184.48150579934267,430 C -34.48,442.6 40.52,260.4 190.51849420065733,238 C 340.52,215.6 415.52,345.4 565.5184942006573,318 C 715.52,290.6 790.52,102.6 940.5184942006573,101 C 1090.52,99.4 1203.62,275.8 1315.5184942006574,310 C 1427.41,344.2 1463.1,279.6 1500,272" stroke="rgba(255, 44, 85, 1)" strokeWidth="2"/>
        </motion.g>
        <defs>
          <mask id="SvgjsMask1189">
            <rect width="1500" height="560" fill="#ffffff"></rect>
          </mask>
        </defs>
      </motion.svg>
    </div>
  )
}