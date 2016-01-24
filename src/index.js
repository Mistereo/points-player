import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root';
import configureStore from './store/configureStore';


const store = configureStore();

ReactDOM.render(
  <Root store={store}/>,
  document.body
);

store.dispatch({
  type: 'LOAD_SGF',
  payload: '(;FF[4]GM[40]CA[UTF-8]AP[zagram.org]SZ[39:32]RU[Punish=0,Holes=1,AddTurn=0,MustSurr=1,MinArea=1,Pass=0,Stop=1,LastSafe=0,ScoreTerr=0,InstantWin=0]AB[sp][tq]AW[sq][tp]PB[Mistereo]PW[kretes]TM[60]OT[5]DT[2013-01-03]RE[B+R]GC[#130938 zagram.org game continued];B[tl];W[so];B[rp];W[tn];B[wn];W[qn];B[pl];W[rl];B[ri];W[qm];B[mk];W[oo];B[mp];W[rq];B[pt];W[qp];B[ls];W[ul];B[vk];W[uk];B[ui];W[ti];B[th];W[si];B[sh];W[uj];B[vi];W[vj];B[wj];W[uq];B[wr];W[wp];B[zp];W[wk];B[xk];W[wl];B[xi];W[ym];B[xl];W[xm];B[wm];W[vm.vjukulvmwlwkvj];B[xo];W[yp];B[yo];W[xp];B[Ao];W[zq];B[yq];W[zr];B[xr];W[tr.tpsqtruqtp];B[wu];W[wt];B[xt];W[vt];B[xs];W[uv];B[vu];W[uu];B[ut];W[vs];B[tt];W[ur];B[su];W[xu];B[wv];W[xv];B[ww];W[yt];B[Dv];W[zs];B[zy];W[Cq];B[Aq];W[Ar];B[Bq];W[Br];B[Cr];W[Cs];B[Dr];W[Ds];B[Es];W[Er];B[Dq];W[Cp];B[An];W[Et];B[Fs];W[Ft];B[Dt];W[Fr];B[Gs];W[Ep];B[Hq];W[Fq];B[Go];W[Do.CqBrCsDsErFqEpDoCpCq];B[Eu];W[El];B[En];W[Dn];B[Em];W[Dm];B[Dl];W[Dk];B[Cl];W[Ck];B[Bl];W[zl];B[Ak];W[yk];B[Aj];W[xj.xjwkwlxmymzlykxj];B[wi];W[zi];B[zj];W[yi];B[yj];W[Bi];B[Ai];W[Ah];B[zh];W[yh];B[Bh];W[zg.zgyhziAhzg];B[Ci];W[Fl];B[Bj.BhAiBjCiBh];W[Fn];B[Gm];W[Fm];B[Gj];W[Ei];B[Dj];W[Ek];B[Ej];W[Fj];B[Fi];W[Gl];B[Hl];W[Hm];B[Il];W[Gn.GlFmGnHmGl];B[Jn];W[Im];B[Jm];W[Fk];B[Hk];W[Fh];B[Gi];W[Di];B[Cj];W[Cf];B[Cg];W[Df];B[Eh];W[Bg];B[Dg.CgBhCiDjEjFiEhDgCg];W[uh];B[vg];W[ug];B[uf];W[tg];B[wf];W[rh];B[sg];W[rg];B[sf];W[qi];B[rf];W[rj.rhqirjsirh];B[pg];W[qf];B[qg];W[nh];B[oi];W[oh];B[ph];W[pi];B[ni];W[re];B[te];W[mh];B[of];W[ln];B[kl];W[km];B[ik];W[jl];B[jk];W[kk];B[kj];W[ll.kkjlkmllkk];B[lj];W[hm];B[gl];W[gm];B[fm];W[hk];B[hl];W[il];B[ji];W[ij];B[jj];W[ii];B[ih];W[fn];B[em];W[gp];B[do];W[en];B[dn];W[dm];B[el];W[dl];B[ek];W[hj];B[dj];W[jh];B[kh];W[jg];B[kg];W[pf];B[og];W[oe];B[pe];W[qe];B[ne];W[od];B[mf];W[md];B[jf];W[ig];B[lf];W[if];B[je];W[pd.pdoepfqepd];B[id];W[se];B[wh.tesfsgthuiviwhvgufte];W[uc];B[ye];W[zd];B[xe];W[ze];B[zf];W[Ag];B[Bf];W[Hr];B[Gr];W[Gq];B[Ip];W[Bx];B[Bv];W[zw];B[Aw];W[Ax];B[zx];W[yw];B[Cv];W[Fu];B[Fv];W[Jo];B[Io];W[Ir];B[Gu];W[Iq];B[Hp];W[In];B[Jp];W[Ko];B[Kq];W[wx];B[xz];W[vw];B[wz];W[uz];B[uy];W[ty];B[vz];W[tx];B[uA];W[tz];B[tA];W[sA];B[sz];W[rA];B[ry];W[rz];B[sy];W[qy];B[sw];W[sx];B[rx];W[rw];B[qx];W[px];B[qw];W[pw];B[rv.rvqwrxswrv];W[vy];B[vx.survswrxsysztAuAvzuyvxwwwvvuutttsu];W[vq.vqurvswtxuytzszrzqypxpwpvq];B[eq];W[is];B[gr];W[ir];B[hu];W[ju];B[jv];W[kv];B[ku];W[iu];B[iv];W[kw];B[lu];W[ht];B[gu];W[fs];B[ft];W[es];B[et];W[ds];B[gs];W[gt];B[fv];W[fr];B[ct];W[cs];B[bs];W[br];B[cr];W[bt];B[as];W[dt];B[cu];W[du];B[dv];W[ev];B[ew];W[fu.esdtduevfugtfses];B[dw];W[cq];B[dr];W[dq];B[gn];W[hn];B[nn];W[no];B[mo];W[mn];B[nm];W[ml];B[nl];W[nk];B[ok];W[nr];B[mr];W[ms];B[nq];W[lr];B[mq];W[or];B[oq];W[pr];B[ns];W[mt];B[po];W[pp];B[op];W[pm];B[on.nnmompnqoppoonnn];W[ot];B[lt];W[nu];B[nv];W[ov];B[mv];W[nw];B[py];W[oy];B[qz.qxpyqzryqx];W[mw];B[yz](;W[ow];B[Fo.BjAkBlClDlEmEnFoGoHpIoJnJmIlHlHkGjFiEjDjCjBj](;W[kr];B[hh];W[bq];B[gi];W[jq];B[he];W[lx.ishtiujukvkwlxmwnwovnumtmslrkrjqiris];B[Bm];W[ro.roqprqsqtpsoro];B[pj.khjikjljmknlokpjoiphogofnemflfkgkh];W[ep];B[gw];W[fo];B[bu];W[cv];B[cx];W[bv];B[at.bsatbuctbs])(;W[lv]))(;W[ps.nrmsmtnuotpsornr];B[pv]))',
});
