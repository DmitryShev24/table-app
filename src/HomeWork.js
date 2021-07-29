// Ребят, как и обещал - интересное ДЗ:
// ++ 1. сделать инпут с кнопкой - при нажатии на кнопку у нас заменяется тайтл вкладки на текст из инпута, причём он там как бегущая строка - вспоминаем билборды заманухи.
// ++ 2. Написать функцию которая принимает массив чисел - задача вернуть предпоследнее наивысшее чётное число.
// 3. Продолжаем развивать нашу табличку, устанавливаем библиотеку react-dropzone, - задача при клике с задержкой на строку в таблице равную 2 секунды, мы можем перетачить строку в другое место изменив позицию - примеров в интернете вагон, ничего сложного, для вас + популярная либа в копилку.

export const HomeWork = () => {
    return two();
}

const one = () => {
    const changeTitle = (e) => {
        e.preventDefault();
        let newTitle = document.forms.test.title.value;
        document.title = newTitle;
        setInterval(() => {
            let lenta = document.title;
            document.title = lenta.substr(1, lenta.length)+lenta.charAt(0);
        }, 100);
    }
        return (
            <form name="test">
                <input type="text" name="title" size={50}/>
                <input type="submit" value="Меняем тайтл" onClick={changeTitle}/>
            </form>
        )
}

const two = () => {
    let newArray = prompt('введите через запятую числа, а я выведу предпоследнее наивысшее чётное число :)').split(",");// [1,4, 234 ,6,3,2,5,]
    let sortArray = []
    newArray.every(e => {
        if (e.replace (/\d/g, '').length) {alert ('вы ввели не только цифры')
            return  false
        }
        let val = !(e % 2);
        if (Number(val)) {
            sortArray.push(e);
        }
    })
    sortArray.sort((a,b) => {
        return a-b
    } );
    if (sortArray.length == 0) {
        return <div>Вы ввели что-то не то!</div>
    }
    return (
        <div>{sortArray[sortArray.length-2]}</div>
    )
}