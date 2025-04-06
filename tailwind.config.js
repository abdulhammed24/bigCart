/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#6CC51D',
        gray: '#868889',
        gray_foreground: '#DCDCDC',
        offWhite: '#F4F5F9',
        blue: '#407EC7',
        black: '#000000',
        white: '#FFFFFF',
        destructive: '#EF574B',
      },
      fontFamily: {
        poppinsRegular: ['Poppins-Regular', 'sans-serif'],
        poppinsLight: ['Poppins-Light', 'sans-serif'],
        poppinsMedium: ['Poppins-Medium', 'sans-serif'],
        poppinsBold: ['Poppins-Bold', 'sans-serif'],
      },
      backgroundImage: {
        // 'primary-gradient':
        //   'linear-gradient(to bottom, #AEDC81 1%, #6CC51D 100%)',
      },
    },
  },
  plugins: [],
};
