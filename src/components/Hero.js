import React from 'react'
import styles from './index.module.css';
// import backGround from './images/resort.JPG';
import { Link } from '@reach/router';

function Hero(props) {
    var {back, title, desc, btnText, btnTo} = props;
    
    return (
        <div className={styles.heroImage} style={{ backgroundImage : `url(${back})` }}>
            <div className={styles.heroBox}>
                <h1 className={styles.heroTitle }>{ title }</h1>
                <div className={styles.heroLine}></div>
                <p className={styles.heroDesc}>{ desc }</p>
                <Link to={btnTo} className={styles.heroBtn} >{ btnText }</Link>
            </div>
        </div>
    )
}
export default Hero