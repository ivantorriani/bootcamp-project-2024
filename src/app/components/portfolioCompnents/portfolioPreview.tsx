import React from 'react';
import Image from 'next/image';
import style from './portfolioPreview.module.css';
import { Portfolio } from '../../portfolioData';

export default function PortfolioPreview(props: Portfolio) {


  return (
    <div className={style.div}>
      <h3>{props.title}</h3>
      <div>
        <p>{props.description}</p>
      </div>
      <div>
        <Image 
          src={"/images/portfolio-attatchment.jpg"} 
          alt={props.title} 
          width={300} 
          height={200} 
        />
      </div>
    </div>
  );
}



      