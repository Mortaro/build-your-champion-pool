import Nullstack from 'nullstack';

import './Application.scss';

class Application extends Nullstack {

  items = {}
  name = '';
  role = '';

  static async start({project}) {
    project.name = 'Faça sua champion pool';
    project.domain = 'nullstack.app';
    project.color = '#D22365';
  }

  prepare({project, page}) {
    page.title = project.name;
    page.locale = 'pt-BR';
  }

  addChampion() {
    const previousList = this.items[this.role] || [];
    const sublist = [
      ...previousList,
      {name: this.name}
    ];
    this.items = { ...this.items, [this.role]: sublist }
  }

  renderForm() {
    return ( 
      <form onsubmit={this.addChampion}>
        <label>
          Nome
          <input name="name" bind={this.name} />
        </label>
        <label>
          Rota
          <input name="role" bind={this.role} />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    )
  }

  renderRole({role}) {
    return (        
      <li>
        <h4>{role}</h4>
        <ul>
          {this.items[role].map(({name}) => <li>{name}</li>)}
        </ul>
      </li>
    )
  }

  renderItems() {
    const roles = Object.keys(this.items);
    if(roles.length === 0) return false;
    return (
      <div>
        <h3>Campeões cadastrados</h3>
        <ul>
          {roles.map(role => <Role role={role} />)}
        </ul>
      </div>
    )
  }

  render({page}) {
    return (
      <main>
        <hgroup>
          <h1> {page.title} </h1>
          <h2>Informe seu campeão</h2>
        </hgroup>
        <Form />
        <Items />
      </main>
    )
  }

}

export default Application;