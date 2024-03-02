import module from './Header.module.css'

const Header = () => {
    return (
        <div className={`${module.wrapper} w-full h-[150px] text-3xl font-bold underline`}>
            header
        </div>
    )
}

export default Header