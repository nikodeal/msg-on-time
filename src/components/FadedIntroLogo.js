import React from "react";
import * as Animatable from 'react-native-animatable';

const FadedIntroLogo = (props) => {

 
    
  return (
<Animatable.View animation='fadeOut' delay={2500} onAnimationEnd={() => props.setActive(false)}>{props.children}</Animatable.View>
  );
};


export default FadedIntroLogo;