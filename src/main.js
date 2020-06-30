import api from './api'

class App{
    constructor(){
        this.repositories = [];
        this.formName = document.getElementById('repo-name');
        this.formButton = document.getElementById('form-button').onclick = async () => {

            const formInput = this.formName.value;
            if(formInput.length === 0){
                alert('A caixa de texto não pode estar vazia');
                return;
            }

            this.setLoading();

            try{
                const response = await api.get(`/repos/${formInput}`);

                const {name, description, html_url, owner: {avatar_url}} = response.data;

                this.repositories.push({
                    name,
                    description,
                    avatar_url,
                    html_url
                });

                this.render();
            }catch(err){
                alert('ERRO! Repositório inexistente')
            }finally{
                this.setLoading(false)
            }

            
        };

        this.listEl = document.getElementById('repo-list');
        this.divEl = document.getElementById('form');
    }
    render(){
        this.listEl.innerHTML = '';
        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);
            
            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);

        });
    }

    setLoading(loading = true){
        if(loading === true){
            let loadEl = document.createElement('span');
            loadEl.appendChild(document.createTextNode('Carregando...'));
            loadEl.setAttribute('id', 'loading');
            this.divEl.appendChild(loadEl);
        }else{
            document.getElementById('loading').remove();
        }
    }

}

new App();