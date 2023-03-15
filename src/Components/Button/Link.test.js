import { React } from "react";
import renderer from "react-test-renderer";
import Link from "./Link";

describe("<Link />", () => {
    it("has 1 child", () => {
        const tree = renderer.create(<Link 
            label="testValue" 
            callBack={() => console.log('test')} 
        />).toJSON();
        expect(tree.children.length).toBe(1);
    });

    it("renders correctly", () => {
        const tree = renderer.create(<Link label="testValue" callBack={() => console.log('test')} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
