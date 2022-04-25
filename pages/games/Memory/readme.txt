Jeux memory-----------
Url     : http://codes-sources.commentcamarche.net/source/46829-jeux-memoryAuteur  : macgileDate    : 02/08/2013
Licence :
=========

Ce document intitulé « Jeux memory » issu de CommentCaMarche
(codes-sources.commentcamarche.net) est mis à disposition sous les termes de
la licence Creative Commons. Vous pouvez copier, modifier des copies de cette
source, dans les conditions fixées par la licence, tant que cette note
apparaît clairement.

Description :
=============

Un petit jeux de memory en javascript pour amuser vos visiteurs.
<br />Se jeux 
est limit&eacute; &agrave; 8 cartes mais peut-&ecirc;tre &eacute;tendu &agrave; 
un nombre de cartes plus &eacute;lev&eacute;.
<br /><a name='source-exemple'></
a><h2> Source / Exemple : </h2>
<br /><pre class='code' data-mode='basic'>
&l
t;html&gt;

&lt;style&gt;

.cartes, .Back, .Front, .Perdu{
  background-rep
eat: no-repeat;
  background-position: center center;
  border: 0px solid gray
;
  cursor: pointer;

  /* La Largeur d'une Image */
  width: 118px;

  /*
 La Hauteur d'une Image */
  height: 186px;
}

.Back {
  z-index : 10;
  b
ackground-image: url(Back.jpg);
}

&lt;/style&gt;

&lt;SCRIPT language=&quo
t;JavaScript&quot; type=&quot;text/JavaScript&quot;&gt;

var Gagner     = 0;

var Count      = 0;
var LastCarte  = null;
var ModeDebug  = false;

// 4 val
eurs * 2 = 8 Cartes, 5 valeurs * 2 = 10 Cartes etc...
var ArrayCartes = new Arr
ay(&quot;A&quot;, &quot;B&quot;, &quot;C&quot;, &quot;D&quot;);
var ValueCarte 
 = ArrayCartes.concat(ArrayCartes);
var NbrValeur   = ValueCarte.length;
var A
rrayDonne  = new Array(NbrValeur);
var Tirage      = true;
var Tentative   = 0
;
var PairesOk    = 0;

// Temporisateur en secondes
var Tempor      = 1000;


// Retourne toutes les Cartes (Coté Back)
function InitCarte()
{
  objCol
Tr = document.getElementById('TabCarte').rows;

  for(i=0; i &lt; objColTr.len
gth; i++)
  {
    colTd = objColTr[i].cells
    for(x=0; x &lt; colTd.length;
 x++)
    {
    	colTd[x].style.backgroundImage = &quot;&quot;;
      colTd[x
].className = &quot;Back&quot;;
    }
  }
  Count = 0;
  document.getElement
ById('Rejouer').disabled = true;
  Donne();
}

// Tirage Aléatoire des Carte
s
function Donne()
{
  var objMSG    = document.getElementById(&quot;MSG&quot
;);
  var objColTr  = document.getElementById('TabCarte').rows;
  var NbrCarte
s = (objColTr[0].cells.length * objColTr.length);
  var objDebug  = document.ge
tElementById(&quot;DivDebug&quot;);

  var OK        = true;
  var Buffer    
= &quot;&quot;;
  var Compteur  = 0;
  
  // Affiche Masque les infos de debu
guage
  objDebug.style.display = (ModeDebug) ? &quot;block&quot; : &quot;none&q
uot;;

  // Le Nbr de Cartes(TD) doit etre egale au Nbr de Valeurs
  // Et do
it être un Nbr Paire
  if(NbrValeur == NbrCartes)
  {
    while(OK)
    {
 
     var Tirage = Math.floor(Math.random() * NbrCartes);
      var reg    = new
 RegExp(&quot;#&quot;+Tirage+&quot;:&quot;, &quot;gi&quot;) ;

      if (!reg.
test(Buffer))
      {
        ArrayDonne[Compteur] = ValueCarte[Tirage];
    
    Buffer += &quot;#&quot; + Tirage+ &quot;:&quot;; 

        // Affiche le B
uffer pour Debug Infos
        objMSG.innerHTML = Buffer;
        Compteur ++;

        if(Compteur == NbrCartes) OK = false;
      }
    }
  }
}

// Te
mporisateur Reset
function ResetChoix(objID, objLast)
{
  objID   = document.
getElementById(objID);
  objLast = document.getElementById(objLast);
  
  // 
Images Vide
  objID.style.backgroundImage   = &quot;&quot;;
  objLast.style.ba
ckgroundImage = &quot;&quot;;

  // Classe Back
  objID.className   = &quot;B
ack&quot;;
  objLast.className = &quot;Back&quot;;
  Tirage            = true;

}

// Click sur une Carte
function Jouer(objID)
{
	// La Carte ne doit pa
s être retournée
  if(Tirage &amp;&amp; objID.className != &quot;Front&quot;)

  {
    Tirage = false;

    if(LastCarte == null)
    {
      objID.classN
ame = &quot;Front&quot;;
      objID.style.backgroundImage = &quot;url(&quot;+A
rrayDonne[objID.id]+&quot;.jpg)&quot;;
      LastCarte       = objID;
      Ti
rage          = true;
    }
    else
    {
      if(LastCarte.id != objID.id
 &amp;&amp; objID.className != &quot;Front&quot;)
      {
        // Retourne 
la Carte et Affiche sa Valeur/Image
        objID.className = &quot;Front&quot;
;
        objID.style.backgroundImage = &quot;url(&quot;+ArrayDonne[objID.id]+&
quot;.jpg)&quot;;

        // Si les deux Cartes sont DIFFÉRENTE
        if(A
rrayDonne[objID.id] != ArrayDonne[LastCarte.id])
        {
          // Declen
che le Temporisateur
          a = setTimeout( &quot;ResetChoix(&quot; + objID.
id + &quot;, &quot;+ LastCarte.id + &quot;)&quot;, Tempor);
          LastCarte
       = null;
        }
        else
        {
          // Les Deux Cartes
 sont EGALE
          LastCarte       = null;
          Count ++;
          P
airesOk ++;
          document.getElementById('paires').innerHTML = PairesOk;


          // Si Tout Gagner (nbr de paires)
          if(Count == (NbrValeur/
2))
          {
            Gagner   ++;
            document.getElementById(
'NbrGagner').innerHTML = Gagner;
            document.getElementById('Rejouer')
.disabled = false;
          }
          Tirage = true;
        }

        
Tentative ++;
        document.getElementById('Try').innerHTML = Tentative;


      }
    }
  }
}

// 1ere Donne des Cartes
window.onload = Donne;
&lt;
/SCRIPT&gt;

  &lt;BODY&gt;
  	
    &lt;TABLE border=0 width=70% align=cente
r cellspacing=&quot;2&quot; cellpadding=&quot;2&quot; &gt;

      &lt;TR&gt;

      	&lt;TD colspan=2&gt;
      		&lt;div id=&quot;DivDebug&quot; style=&quot
;display:none;&quot; &gt;
      	   &lt;table width=100% align=center cellspaci
ng=&quot;0&quot; cellpadding=&quot;0&quot; border=0 &gt;
             &lt;TR&gt
;
             	 &lt;TD&gt; Nbr Gagner :       &lt;/TD&gt;&lt;TD  align=left id
=&quot;NbrGagner&quot; width=5% &gt;&amp;nbsp;&amp;nbsp;&lt;/td&gt;
           
    &lt;TD&gt; Valeurs Aléatoire: &lt;/TD&gt;&lt;TD  align=left id=&quot;MSG&quo
t;&gt;&amp;nbsp;&amp;nbsp;&lt;/td&gt;
             &lt;/TR&gt;
             &l
t;TR&gt;
               &lt;TD&gt; Tentatives : &lt;/TD&gt;&lt;TD align=left id
=&quot;Try&quot;&gt;&amp;nbsp;&amp;nbsp;&lt;/td&gt;
               &lt;TD&gt; P
aires Ok  : &lt;/TD&gt;&lt;TD align=left id=&quot;paires&quot;&gt;&amp;nbsp;&amp
;nbsp;&lt;/td&gt;
             &lt;/TR&gt;
           &lt;/table&gt;
        
  &lt;/div&gt;
        &lt;/TD&gt;
      &lt;/TR&gt;
      &lt;TR&gt;
      
  &lt;TD&gt;
        	&lt;label for=&quot;tempo&quot;&gt; Niveaux de Difficulté
  &lt;/label&gt;
        	&lt;select id=&quot;tempo&quot; onchange=&quot;Tempor
 = this[this.selectedIndex].value;&quot;&gt;
        		&lt;option value=1500&gt
;Facile&lt;/option&gt;
        		&lt;option value=1000 selected&gt;Moyen&lt;/op
tion&gt;
        		&lt;option value=500&gt;Dur&lt;/option&gt;
        		&lt;op
tion value=200&gt;Trés Dur&lt;/option&gt;
        	&lt;/select&gt;
        &lt
;/TD&gt;
        &lt;TD&gt;
           &lt;input id=&quot;Rejouer&quot; type=&
quot;button&quot; value=&quot;Rejouer&quot; onclick=&quot;InitCarte();&quot; dis
abled&gt;
        &lt;/TD&gt;        
        &lt;/TR&gt;
    &lt;/TABLE&gt;

    &lt;br&gt;
   &lt;TABLE border=0  align=center cellspacing=&quot;1&quot; c
ellpadding=&quot;1&quot; &gt;

     &lt;TBODY id=TabCarte&gt;
      &lt;tr&gt
;
       &lt;td id=&quot;0&quot; onclick=&quot;Jouer(this)&quot; class=Back&gt;
&amp;nbsp;&lt;/td&gt;
       &lt;td id=&quot;1&quot; onclick=&quot;Jouer(this)&
quot; class=Back&gt;&amp;nbsp;&lt;/td&gt;
       &lt;td id=&quot;2&quot; onclic
k=&quot;Jouer(this)&quot; class=Back&gt;&amp;nbsp;&lt;/td&gt;
       &lt;td id=
&quot;3&quot; onclick=&quot;Jouer(this)&quot; class=Back&gt;&amp;nbsp;&lt;/td&gt
;
      &lt;/tr&gt;
      &lt;tr&gt;
       &lt;td id=&quot;4&quot; onclick=&
quot;Jouer(this)&quot; class=Back&gt;&amp;nbsp;&lt;/td&gt;
       &lt;td id=&qu
ot;5&quot; onclick=&quot;Jouer(this)&quot; class=Back&gt;&amp;nbsp;&lt;/td&gt;

       &lt;td id=&quot;6&quot; onclick=&quot;Jouer(this)&quot; class=Back&gt;&am
p;nbsp;&lt;/td&gt;
       &lt;td id=&quot;7&quot; onclick=&quot;Jouer(this)&quo
t; class=Back&gt;&amp;nbsp;&lt;/td&gt;
      &lt;/tr&gt;
    &lt;/TBODY&gt;


   &lt;/TABLE&gt;
   
  &lt;/BODY&gt;
&lt;/HTML&gt;
</pre>
