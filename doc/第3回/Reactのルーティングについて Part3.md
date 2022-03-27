# もっと楽にルーティングを実装する方法
ここまでReact Routerを使用したルーティングについて説明してきましたが、ReactのルーティングはWordPressなどのCMSや、Ruby on RailsやLaravelなどのMVCフレームワークと比べると面倒くさいなと思いませんか？

Reactのルーティングはフレームワークを導入することで、React Routerを使うよりも楽に実装することができます。

* [Next.js](https://nextjs.org/)
* [Gatsby](https://www.gatsbyjs.com/)

これらのフレームワークでは、pagesディレクトリの配下にパスと同じ名前のコンポーネントを配置するだけで簡単にルーティングが実現できます。

アクセスされたURLに紐づくページを表示するような動的ルーティングは、React Routerと同じく若干面倒ですが、うまく使いこなすことで開発速度を上げることが可能です。

## 【豆知識】じゃあ、React Routerなんていらなくない？
じゃあReact Routerなんていらなくないなんて思った方もいるかもしれませんが、一概にそうとも言えません。

Next.jsやGatsbyは事前にアクセスされるURLに紐づく静的なHTMLを生成したり、一般的なウェブサイトやウェブアプリケーションと同じようにサーバーサイドでHTMLの生成を行うことが出来ます。   
これらのHTMLを生成する方法は、前者はSG（Static Gneration）、後者はSSR（Server Side Rendering）と呼ばれます。

SGやSSRでは、CSR（Client Side Rendering）ほど素早いページ遷移は実現できないので、高速なページ遷移や高いUXを提供する必要があるケースではSPAが必要になります。

Reactを用いたSPA開発でルーティングを実現するには、React Routerがもっともポピュラーな方法です。   
そのため、React Routerは不要ではないのです。
