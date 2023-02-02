import { useEffect } from 'react'
import './welcome.scss'

import HomeSection from '../HomeSection'
import Button from '../../button/Button'

import hoverEffect from 'hover-effect'

import {
    bg1,
    champAshe,
    champAhri,
    champGaren,
    distortion
} from '../../../assets/images'

const champImgs = [champAshe, champAhri, champGaren]

const Welcome = props => {

    useEffect(() => {
        const welcomeImgs = document.querySelectorAll('#welcome__img__slide > img')
        let animates = []
        welcomeImgs.forEach((item, index) => {
            let nextImg = welcomeImgs[index === welcomeImgs.length - 1 ? 0 : index + 1].getAttribute('src')
            let animation = new hoverEffect({
                parent: document.querySelector('#welcome__img__slide'),
                intensity: 0.5,
                image1: item.getAttribute('src'),
                image2: nextImg,
                displacementImage: distortion,
                hover: false
            })
            animates.push(animation)
        })
        welcomeImgs.forEach(e => e.remove())

        let currItem = 0

        const autoImageSlide = () => {
            let prevItem = currItem
            currItem = (currItem + 1) % animates.length

            if (!document.hidden) {
                animates[prevItem].next()
            }

            setTimeout(() => {
                let canvas = document.querySelectorAll('#welcome__img__slide > canvas')
                document.querySelector('#welcome__img__slide').appendChild(canvas[0])
                animates[prevItem].previous()
            }, 3000);
        }

        setInterval(autoImageSlide, 3000);
    }, [])

    return (
        <HomeSection
            className={`welcome ${props.isActive ? 'active' : ''}`}
            contentClassName="overlay welcome__content"
            bgImage={bg1}
        >
            <div className="welcome__info relative">
                <div className="welcome__info__content">
                    <div className="title">
                        <span>Bem-Vindo</span>
                        <h2 className="main-color">à Fenda dos Invocadores</h2>
                    </div>
                    <div className="description m-t-4">
                    Junte-se aos seus amigos e teste suas habilidades no combate MOBA 5v5. Toda a competição de alta habilidade que você deseja, projetada especialmente para dispositivos móveis e consoles com controles renovados e partidas simplificadas. Explore o universo vivo de Runeterra por meio de histórias, quadrinhos, jogos e muito mais. Em seguida, mergulhe na comunidade de jogadores, cosplayers, músicos e criadores de conteúdo que estão esperando por você para se juntar a eles.
                    </div>
                    <div className="btns m-t-4">
                        <Button className="btn-main">JOGUE AGORA</Button>
                        <Button className="btn-second">INICIAR</Button>
                    </div>
                </div>
            </div>
            <div className="welcome__img relative">
                <div className="welcome__img__slide" id="welcome__img__slide">
                    {
                        champImgs.map((item, index) => (
                            <img src={item} key={index}/>
                        ))
                    }
                </div>
            </div>
        </HomeSection>
    )
}

export default Welcome
