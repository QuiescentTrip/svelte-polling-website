<script>
import graphql  from '../graphql.js';
import { fly } from 'svelte/transition';

function sendingQuestion(Question){ 
return `
mutation NewPoll {
  insert_poll(objects: {question: "${Question}"}) {
    returning {
      uuid
    }
  }
}
`
}
function sendingAnswers(answer, pollid){
return `
mutation answerMutation {
  insert_answer(objects: {answer: "${answer}", pollid: "${pollid}"}) {
    returning {
      uuid
    }
  }
}`
}
let maxlength = 6
async function submit(Question){
    let emptycheck = 0
    for (i = 0; i < answers.length; i++) {
        if(answers[i].text == ""){
            emptycheck += 1;
        }
    }   
    if(answers.length > 1 && answers.length < maxlength && Question !== "" && emptycheck == 0){
    console.log(Question)
    const questionquery = await graphql(sendingQuestion(Question))
    let questionuuid = Object.values(questionquery)[0].returning[0].uuid
    var i;
    for (i = 0; i < answers.length; i++) {
        graphql(sendingAnswers(answers[i].text, questionuuid));
    }location.reload()}
    else if(answers.length < 2){
        alert("You must have more than 1 answer!")
    }else if(answers.length >= maxlength){
        alert(`You must have less than ${maxlength} answers!`)
    }else{
        alert("You cannot have an empty question box!")
    }
}

let Question = ""
	let answers = [
		{text: '' },
		{text: '' },
		{text: '' },
	];

	function add() {
		answers = answers.concat({text: '' });
	}

	function clear(index) {
		answers.splice(index, 1);   
		answers = answers;
    }

  
</script>
<input bind:value={Question} placeholder="Your Question" style="width: 222px;" id="title">
{#each answers as answer, index}
	<div>
		<input
			placeholder="Answer"
			bind:value={answer.text}
			transition:fly="{{ x: -20, duration: 200 }}"
        >
        {#if answers.length > 2}
        <button on:click={() => clear(index)} id="cross" transition:fly="{{ x: 20, duration: 200 }}">
            ✘
        </button>
        {/if}
	</div>
{/each}

<button on:click={add}>
	New answer
</button>
<button type="submit" value="Submit" on:click={submit(Question)}>Submit</button>
<style>
    #cross{
        color: red;
    }
    #cross:hover{
        background-color: grey;
    }
</style>