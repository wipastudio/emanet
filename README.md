# Emanet — destek, gizlilik, koşullar, davetler

**Emanet**'in herkese açık sitesi: uygulamalarını mühürlersin, açmak
istediğinde kararı güvendiğin bir kişi verir. Bu repo yalnızca web sitesi;
uygulama açık kaynak değil.

- Destek — <https://wipastudio.github.io/emanet/> · [English](https://wipastudio.github.io/emanet/en/)
- Gizlilik — <https://wipastudio.github.io/emanet/gizlilik.html> · [Privacy](https://wipastudio.github.io/emanet/en/privacy.html)
- Koşullar — <https://wipastudio.github.io/emanet/kosullar.html> · [Terms](https://wipastudio.github.io/emanet/en/terms.html)

## Bağlantılar

| Yol | Ne |
|---|---|
| `/emanet/d/?c=KOD` | Davet — Universal Link; uygulama yoksa sayfa anlatır. Gerçek dosya (200), mesajlaşma uygulamaları önizleme kartı üretir. |
| `/emanet/d/KOD` | Aynı davet, kısa hâl (`404.html` yönlendirir) |
| `/emanet/o/<rota>` | Uygulama içi bir yer: `ask`, `settings`, `subscribe`, `transcript`, `keeper`, `digest`, `feedback`, `emergency`, `r/<talep>` |
| `emanet://<rota>` | Aynı rotalar, özel şema |

Universal Link dosyası (`apple-app-site-association`) alan adının kökünde
olmak zorunda: <https://github.com/wipastudio/wipastudio.github.io>.

Bu sayfalar **üretilir** — elle düzenleme. Kaynak Emanet reposunda
`docs/hukuk/` ve `tools/build_site.py`.

İletişim: wipastudios@gmail.com
