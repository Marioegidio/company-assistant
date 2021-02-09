# CompanyAssistant for Azure

In questo periodo legato al Covid-19 molte aziende e professionisti sono stati costretti ad adattarsi allo Smart Working. A causa di questo sono sorte diverse problematiche. Tra queste ci sono quelle legate alla gestione e alla comunicazione interna nelle aziende e problematiche legate alle macchine da adoperare per svolgere il lavoro assegnato. 
Infatti, molti lavoratori, usufruendo spesso delle macchine disponibili presso l’azienda per svolgere le proprie mansioni, potrebbero riscontrare grossi problemi nel dover utilizzare macchine proprie in quanto, spesso, meno performanti. Inoltre, molte aziende a causa di scarsità di risorse e tempo non potrebbero permettersi di realizzare infrastrutture on-premise.
A tal proposito viene proposta una soluzione basata sull’utilizzo di alcuni servizi Cloud offerti da Microsoft Azure.

CompanyAssistant for Azure è una piattaforma web che offre le seguenti funzionalità:

* **Gestione di macchine virtuali.** In questo caso l’admin della piattaforma ha la possibilità di creare macchine virtuali adatte alle esigenze dell’azienda e del singolo utente con pochi click. Il tutto restando all’interno della piattaforma, quindi senza interagire con ambienti esterni. Inoltre ha la possibilità di visualizzare lo stato delle macchine e il loro utilizzo.

* **Utilizzo di macchine virtuali tramite desktop remoto.** In questo caso l'utente della piattaforma può accedere da remoto alle diverse macchine virtuali assegnate e può sfruttare tutta la potenza di calcolo di queste ultime. Il tutto è possibile anche utilizzando fisicamente una macchina poco performante per accedere alla web app. Inoltre grazie ai cognitive serives di Azure, vengono suggeriti, in modo intelligente, i tag da assegnare alle macchine e le configurazioni ideali in base all'utilizzo.

* **Gestione automatizzata delle problematiche con memorizzazione storico risposte (QnA).** La piattaforma prevede una sezione dove ogni utente può condividere le problematiche riscontrare con la relativa soluzione. Qui, un secondo utente può consultare e verificare se un problema riscontrato è già stato risolto da qualche altro collega.

<br><br><br>
## Architettura 
||
|:---:|
|![alt text](https://github.com/Marioegidio/company-assistant/raw/main/arc.jpeg)|

<br><br><br>
## Servizi Azure


* **Virtual Machines**: per la creazione di macchine virtuali che saranno utilizzate dagli utenti;

* **App Service**, per l'hosting della web app e del bot;

* **Function App**, per eseguire alcune attività come la creazione o la cancellazione di macchine virtuali;

* **Bot service**, per la creazione del bot di supporto alle problematiche aziendali;

* **QnA Maker**, per la gestione automatizzata delle problematiche con memorizzazione storico risposte;

* **LUIS**, per i suggerimenti intelligenti dei tag, da assegnare alla macchine virtuali e per i suggeriemnti legati alle configurazioni

* **Azure SQL**, per la gestione dei dati persistanti;

* **Event Grid**, per catturare e gestire eventi come l'avvenuta creazione di una macchina virtuale;





