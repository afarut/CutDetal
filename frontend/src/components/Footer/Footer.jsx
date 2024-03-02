import module from './Footer.module.css'

import instagramIcon from '../../images/instagram.svg'
import facebookIcon from '../../images/facebook.svg'
import whatsAppIcon from '../../images/whatsapp.svg'
import telegramIcon from '../../images/telegram.svg'

const Footer = () => {
    return (
        <div className="footer-wrapper w-full items-center ">
            <div className={`${module.footerNavWrapper} flex justify-between items-center h-[142px]`}>
                <div className='pl-[42px]'>
                    <span className={`${module.logoTitle}`}>LOGO</span>
                </div>

                    <div className={`${module.navigationWrapper}`}>
                        <ul className='flex items-center'>
                            <li>
                                О нас
                            </li>
                            <li>
                                Помощь
                            </li>
                            <li>
                                FAQ
                            </li>
                            <li>
                                Бизнес
                            </li>
                        </ul>
                    </div>
                    <div className={`${module.contactsWrapper} flex items-start flex-col`}>
                        <span className={`${module.contacts}`}>Контакты</span>
                        <span>+7923532111</span>
                        <span>example@mail.com</span>
                    </div>
                    <div className={`${module.imagesWrapper} flex items-center pr-[42px]`}>
                        <img src={instagramIcon} alt='instagram' />
                        <img src={facebookIcon} alt='facebook' />
                        <img src={whatsAppIcon} alt='whatsapp' />
                        <img src={telegramIcon} alt='telegram' />
                    </div>
            </div>
            <div className={`${module.projName} w-full flex justify-center items-center h-[38px]`}>
                <span>©2024 CutDetal</span>
            </div>
        </div>
    )
}

export default Footer