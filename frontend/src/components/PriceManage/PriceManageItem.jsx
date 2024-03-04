import pencilIcon from '../../images/pencil.svg'
import trashIcon from '../../images/trash.svg'

import module from './PriceManage.module.css'

const PriceManageItem = ({setPopupVisible}) => {
    return (
        <div className={`${module.PriceManageItem} w-full mb-[10px] py-[13px] lg:px-[25px] px-[13px]`}>
            <div className='mb-[8px] flex justify-between '>
                <span className={`${module.nameOfMaterial} text-[24px]`}>{'Аллюминий'}</span>
                <div className='flex items-center'>
                    <img height={27} className='mr-[15px] lg:ml-[17px] cursor-pointer' onClick={() => setPopupVisible(true)} src={pencilIcon} />
                    <img height={27} className='cursor-pointer' src={trashIcon} />
                </div>
            </div>

            <div className={`${module.materialInfoWrapper} flex justify-start flex-col lg:flex-row`}>
            <div className={`${module.materialInfoContainer} flex flex-col lg:mr-[135px]`}>
                <span className={`${module.titleInfo} mb-[5px]`}>Цена в зависимости от метража:</span>
                <div>
                <span className={`${module.fieldDesc}`}>За м&#178;: </span><span>{100} RUB</span>
                </div>
                <div><span className={`${module.fieldDesc}`}>Вес 1м&#178;: </span><span>5</span></div>
            </div>
            <div className={`${module.materialInfoContainer} flex flex-col`}>
                <span className={`${module.titleInfo} mb-[5px]`}>За пог. метр:</span>
                <div>
                <span className={`${module.fieldDesc}`}>От {0.001} до {10}м: </span><span>{100} RUB</span>
                </div>
                <div>
                <span className={`${module.fieldDesc}`}>От {0.001} до {10}м: </span><span>{100} RUB</span>
                </div>
                <div>
                <span className={`${module.fieldDesc}`}>От {0.001} до {10}м: </span><span>{100} RUB</span>
                </div>
                <div>
                <span className={`${module.fieldDesc}`}>От {0.001} до {10}м: </span><span>{100} RUB</span>
                </div>
                <div>
                <span className={`${module.fieldDesc}`}>От {0.001} до {10}м: </span><span>{100} RUB</span>
                </div>
            </div>
            </div>
        </div>
    )
}

export default PriceManageItem;