/*** DO NOT TOUCH ***/
import { DefaultConfig, DefaultLoaders } from "./webpack";
import { root } from "./helpers";
import { DefinePlugin } from "webpack";
// import TsConfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

// optimization
import * as CompressionPlugin from "compression-webpack-plugin";
import * as OptimizeJsPlugin from "optimize-js-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";

// postCss
import * as Autoprefixer from "autoprefixer";
import * as CssNano from "cssnano";

// ssr
import * as VueSSRClientPlugin from "vue-server-renderer/client-plugin";
import * as VueSSRServerPlugin from "vue-server-renderer/server-plugin";
import { NamedModulesPlugin } from "webpack";

import { CustomHeadTags, CustomCopyFolders } from "./custom";

// copy
export const DefaultCopyFolders = [
  { from: "src/static", globOptions: { ignore: ["favicon.ico"] } },
  { from: "src/meta" },
];

export const loader: DefaultLoaders = {
  tsLintLoader: {
    enforce: "pre",
    test: /\.ts?$/,
    use: [
      {
        loader: "tslint-loader",
        options: {
          typeCheck: true,
        },
      },
    ],
  },
  tsLoader: {
    test: /\.ts$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.es2015.json",
          appendTsSuffixTo: [/TS\.vue$/],
        },
      },
    ],
  },
  jsxLoader: {
    test: /\.tsx$/,
    use: [
      {
        loader: "babel-loader",
      },
      {
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.es2015.json",
          appendTsxSuffixTo: [/TSX\.vue$/],
        },
      },
    ],
    exclude: [/\.(spec|e2e)\.ts$/],
  },
  sourceMapLoader: {
    test: /\.js$/,
    use: ["source-map-loader"],
    enforce: "pre",
  },
  vueLoader: {
    test: /\.vue$/,
    use: [
      {
        loader: "vue-loader",
        options: {
          loaders: {
            ts: "ts-loader",
            tsx: "babel-loader!ts-loader",
          },
        },
      },
    ],
  },
  fontLoader: {
    test: /\.(ttf|eot|woff|woff2)$/,
    use: {
      loader: "file-loader",
      options: {
        name: "fonts/[name].[ext]",
      },
    },
  },
  cssLoader: {
    test: /\.(sa|sc|c)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
      },
      {
        loader: "postcss-loader",
        options: {
          plugins: () => [Autoprefixer(), CssNano()],
        },
      },
    ],
  },
  htmlLoader: {
    test: /\.html$/,
    use: "raw-loader",
    exclude: [root("src/index.html")],
  },
  fileLoader: {
    test: /\.(jpg|png|gif)$/,
    use: "file-loader",
  },
};

export const DefaultCommonConfig = ({ isDev }): DefaultConfig => {
  return {
    rules: [
      loader.cssLoader,
      loader.fontLoader,
      loader.htmlLoader,
      loader.fileLoader,
    ],
    plugins: [
      // new TsConfigPathsPlugin(),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: isDev ? "[name].css" : "[name].[hash].css",
        chunkFilename: isDev ? "[id].css" : "[id].[hash].css",
      }),
    ],
  };
};

export const DefaultDevConfig = ({ isDev }): DefaultConfig => {
  return {
    rules: [loader.vueLoader, loader.tsLoader, loader.jsxLoader],
    plugins: [
      new DefinePlugin({
        __DEV__: isDev,
        __PROD__: !isDev,
        "process.env.NODE_ENV": JSON.stringify(
          process.env.NODE_ENV || "development"
        ),
        "process.env.VUE_ENV": '"client"',
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.html",
        title: CustomHeadTags.title,
      }),
      new NamedModulesPlugin(),
      new CopyWebpackPlugin({
        patterns: [...DefaultCopyFolders, ...CustomCopyFolders],
      }),
      new VueSSRClientPlugin(),
      // ManifestPlugin
    ],
  };
};

export const DefaultSsrConfig = ({ isDev }): DefaultConfig => {
  return {
    rules: [loader.vueLoader, loader.tsLoader, loader.jsxLoader],
    plugins: [
      new DefinePlugin({
        __DEV__: isDev,
        __PROD__: !isDev,
        "process.env.NODE_ENV": JSON.stringify(
          process.env.NODE_ENV || "development"
        ),
        "process.env.VUE_ENV": '"server"',
      }),
      new VueSSRServerPlugin(),
    ],
  };
};

export const DefaultProdConfig = ({ isDev }): DefaultConfig => {
  return {
    rules: [loader.vueLoader, loader.tsLoader, loader.jsxLoader],
    plugins: [
      new VueSSRClientPlugin(),
      new DefinePlugin({
        __DEV__: isDev,
        __PROD__: !isDev,
        "process.env.NODE_ENV": JSON.stringify(
          process.env.NODE_ENV || "development"
        ),
        "process.env.VUE_ENV": '"client"',
      }),
      new OptimizeJsPlugin({
        sourceMap: false,
      }),
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$/,
        threshold: 2 * 1024,
        minRatio: 0.8,
      }),
      new CopyWebpackPlugin({
        patterns: [...DefaultCopyFolders, ...CustomCopyFolders],
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        title: CustomHeadTags.title,
        inject: false,
        minify: false,
      }),
    ],
  };
};
