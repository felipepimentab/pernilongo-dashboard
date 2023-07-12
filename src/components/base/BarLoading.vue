<template>
  <div class="loader">
    <div class="loader__bar"></div>
    <div class="loader__bar"></div>
    <div class="loader__bar"></div>
    <div class="loader__bar"></div>
    <div class="loader__bar"></div>
    <div class="loader__ball"></div>
  </div>
</template>

<style lang="scss" scoped>
// Variables
$bar-color: $blue;
$ball-color: $blue--dark;
$scale: 5;

.loader {
  position: relative;
  width: calc(75px * $scale);
  height: calc(100px * $scale);
  
  &__bar {
    position: absolute;
    border-radius: calc(1px * $scale);
    bottom: 0;
    width: calc(10px * $scale);
    height: 50%;
    background: $bar-color;
    transform-origin: center bottom;
    box-shadow: calc(1px * $scale) calc(1px * $scale) 0 rgba(0,0,0,.2);
    
    @for $i from 1 through 5 { 
       &:nth-child(#{$i}) {
         left: ($i - 1) * calc(15px * $scale);
         transform: scale(1,$i*.2);
         animation: barUp#{$i} 4s infinite;
        }
    }
    
  }
  
  &__ball {
    position: absolute;
    bottom: calc(10px * $scale);
    left: 0;
    width: calc(10px * $scale);
    height: calc(10px * $scale);
    background: $ball-color;
    border-radius: 50%;
    animation: ball 4s infinite;
  }
}

@keyframes ball {
  0% {
    transform: translate(0, 0);
  }
  5% {
    transform: translate(calc(8px * $scale), calc(-14px * $scale));
  }
  10% {
    transform: translate(calc(15px * $scale), calc(-10px * $scale))
  }
  17% {
    transform: translate(calc(23px * $scale), calc(-24px * $scale))
  }
  20% {
    transform: translate(calc(30px * $scale), calc(-20px * $scale))
  }
  27% {
    transform: translate(calc(38px * $scale), calc(-34px * $scale))
  }
  30% {
    transform: translate(calc(45px * $scale), calc(-30px * $scale))
  }
  37% {
    transform: translate(calc(53px * $scale), calc(-44px * $scale))
  }
  40% {
    transform: translate(calc(60px * $scale), calc(-40px * $scale))
  }
  50% {
    transform: translate(calc(60px * $scale), 0)
  }
  57% {
    transform: translate(calc(53px * $scale), calc(-14px * $scale))
  }
  60% {
    transform: translate(calc(45px * $scale), calc(-10px * $scale))
  }
  67% {
    transform: translate(calc(37px * $scale), calc(-24px * $scale))
  }
  70% {
    transform: translate(calc(30px * $scale), calc(-20px * $scale))
  }
  77% {
    transform: translate(calc(22px * $scale), calc(-34px * $scale))
  }
  80% {
    transform: translate(calc(15px * $scale), calc(-30px * $scale))
  }
  87% {
    transform: translate(calc(7px * $scale), calc(-44px * $scale))
  }
  90% {
    transform: translate(0, calc(-40px * $scale))
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes barUp1 { 
  0% {
    transform: scale(1, .2);
  }
  40%{
    transform: scale(1, .2);
  }
  50% {
    transform: scale(1, 1);
  }
  90% {
    transform: scale(1,1);
  }
  100% {
    transform: scale(1,.2);
  }
}
@keyframes barUp2 { 
  0% {
    transform: scale(1, .4);
  }
  40% {
    transform: scale(1, .4);
  }
  50% {
    transform: scale(1, .8);
  }
  90% {
    transform: scale(1, .8);
  }
  100% {
    transform: scale(1, .4);
  }
}
@keyframes barUp3 { 
  0% {
    transform: scale(1, .6);
  }
  100% {
    transform: scale(1, .6);
  }
}
@keyframes barUp4 { 
  0% {
    transform: scale(1, .8);
  }
  40% {
    transform: scale(1, .8);
  }
  50% {
    transform: scale(1, .4);
  }
  90% {
    transform: scale(1, .4);
  }
  100% {
    transform: scale(1, .8);
  }
}
@keyframes barUp5 { 
  0% {
    transform: scale(1, 1);
  }
  40% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, .2);
  }
  90% {
    transform: scale(1, .2);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>