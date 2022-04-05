module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        Ubuntu: ["Ubuntu", "sans-serif"],
        Open_Sans: ["Open Sans", "sans-serif"]
      },
      colors : {
        'clear-1'   : 'rgba(244, 140, 6, 1)'   ,
        'clear-2'   : 'rgba(250, 163, 7, 0.76)',
        'clear-3'   : 'rgba(255, 186, 8, 0.69)',
        'drizzle-1' : 'rgba(0, 95, 115, 1)'    ,
        'drizzle-2' : 'rgba(10, 147, 150, 1)'  ,
        'drizzle-3' : 'rgba(148, 210, 189, 1)' ,
        'rain-1'    : 'rgba(3, 4, 94, 1)'      ,
        'rain-2'    : 'rgba(2, 62, 138, 1)'    ,
        'rain-3'    : 'rgba(0, 119, 182, 1)'   ,
        'snow-1'    : 'rgba(255, 255, 255, 1)' ,
        'snow-2'    : 'rgba(144, 224, 239, 1)' ,
        'snow-3'    : 'rgba(173, 232, 244, 1)' ,
        'cloud-1'   : 'rgba(0, 119, 182, 1)'   ,
        'cloud-2'   : 'rgba(72, 202, 228, 1)'  ,
        'cloud-3'   : 'rgba(144, 224, 239, 1)' ,
        'thunder-1' : 'rgba(60, 9, 108, 1)'    ,
        'thunder-2' : 'rgba(90, 24, 154, 1)'   ,
        'thunder-3' : 'rgba(199, 125, 255, 1)'
      }
    },
  },
  plugins: [],
}
