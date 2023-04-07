
const { src, dest, task } = require('gulp');
const fs = require('fs');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const header = require('gulp-header');

const pack = () => JSON.parse(fs.readFileSync("./package.json", "utf8"));
const pkg = pack();

const startYear = '2023';
const currentYear = new Date().getFullYear().toString();
const year = (startYear == currentYear) ? startYear : `${startYear}-${currentYear}`;
const bannerContent =
`/*!
 * SingleDivUI v${pkg.version} | ${pkg.homepage} | (c) ${year} Soundar | MIT License
 */

`;

task('build_css', () => {
    return src(['src/index.css'])
        .pipe(cleanCSS({
            format: 'keep-breaks'
        }))
        
        .pipe(rename("singledivui.min.css"))

        // move the files to the dist folder
        .pipe(dest('dist/'));
});

task('add_banner', () => {
    return src(['dist/*'])
        // add the banner content, since all the comments will be removed during the build
        .pipe(header(bannerContent))

        // keep the files in the dist folder
        .pipe(dest('dist/'));
});
