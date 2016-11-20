import fs from 'fs'
import path from 'path'
import renderer from './renderer'

export default function ({main, links = []} = {}) {
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public')
  }

  fs.readdirSync(path.resolve(__dirname, 'public'))
    .forEach(file => 
      fs.createReadStream(path.resolve(__dirname, `public/${file}`))
        .pipe(fs.createWriteStream(`public/${file}`))
    )

  fs.writeFile('index.html', `<!DOCTYPE html>${renderer({
    main: fs.readFileSync(main, 'utf8'),
    links: [
      ...links,
      'public/style.css'
    ],
    scripts: [
      'public/app.js',
    ],
  })}`, 
    err => {
      if (err) throw err;
      console.log('It\'s saved!');
    }
  )
}
