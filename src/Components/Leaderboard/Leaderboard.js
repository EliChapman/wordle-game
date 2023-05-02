import { useState } from "react"
import "./Leaderboard.css"

const Leaderboard = () => {

    const [sort, setSortType] = useState('time')

    const changeSortType = () => {
        if (sort === 'time') {
            setSortType('alphabetical')
        } else
        if (sort === 'alphabetical') {
            setSortType('chronological')
        } else
        if (sort === 'chronological') {
            setSortType('time')
        }
    }

    const displayScores = () => {
        var word_list = localStorage.getItem('words').split(" ")
        var time_list = localStorage.getItem('time').split(" ")
        word_list.pop()
        time_list.pop()
        var output = []
        var order = [...Array(word_list.length).keys()]

        if (sort === 'chronological') {

        } else
        if (sort === 'time') {
            for(let i = 1; i < time_list.length;i++){
                for(let j = i - 1; j > -1; j--){
                    if(time_list[j + 1] > time_list[j]){
                        [order[j+1], order[j]] = [order[j], order[j + 1]];
                        [time_list[j+1], time_list[j]] = [time_list[j], time_list[j + 1]];
                    }
                }
            };
        } else
        if (sort === 'alphabetical') {
            for(let i = 1; i < word_list.length;i++){
                for(let j = i - 1; j > -1; j--){
                    if(word_list[j + 1].localeCompare(word_list[j]) === -1){
                        [order[j+1], order[j]] = [order[j], order[j + 1]];
                        [word_list[j+1], word_list[j]] = [word_list[j], word_list[j + 1]];
                    }
                }
            };
        }

        word_list = localStorage.getItem('words').split(" ")
        time_list = localStorage.getItem('time').split(" ")
        word_list.pop()
        time_list.pop()

        for (let i = 0; i < word_list.length; i++) {
            output.push(
                <tr key={i}>
                    <td>{word_list[order[i]]}</td>
                    <td>{time_list[order[i]]}</td>
                </tr>
            )
        }

        return (output)
    }

    return (
        <div id="leaderboard-container">
            <div id='sort-button' unselectable="on" onClick={() => changeSortType()}>
                Sort by: {sort}
            </div>
            <div id='scores'>
                <table>
                    <thead>
                        <tr>
                            <th id='word-column'>Word</th>
                            <th id='time-column'>Time (s)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayScores()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Leaderboard;